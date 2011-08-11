Title: My little ec2 node.js wheat adventure
Author: johnjbarton
Date: 10AUG11

Ok I think I have a blog. We'll see. I'll test it with a blog post to
myself: let me try to remember what I did to set this up.

I wanted a new blog. I've been using the [Firebug
blog](http://blog.getfirebug.com) but it would not be appropriate to
use it now that I'm not a contributor. I did like WordPress: simple
enough, powerful enough. Well except that it's really not. Adding code
snippets is painful. I want to experiment with inline demos and wacky
web pages. Plus the hosting systems limit your options by providing
more simplicity.

To get more power I wanted to play with Node.js. I like it's event I/O
model (or at least I hate threads). I learned JavaScript while working
on [Firebug](http://getfirebug.com).  I work on devtools for the
Chrome Browser, it has a V8 JS engine like Node.js.  So it seems like
something I should know.

Plus I have a secret plan. Well more like a foolish desire: I want a
simple [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer)
server wired into [Git](http://git-scm.com/). I'm using
[Orion](http://wiki.eclipse.org/Orion) now. I like its [Git
API](http://wiki.eclipse.org/Orion/Server_API/Git_API), but it's
written in some funky old language.

node.js does have a blog system,
[wheat](https://github.com/creationix/wheat). As soon as I read that
it used [markdown](http://wiki.eclipse.org/Orion/Server_API/Git_API) I
was in. But its way cooler than that. Wheat support inline code demos 
and the CMS is Git. Presto, solutions for editing, code demos, and backup.

The final bit was hosting. Lots of good choices, but I was unsure how
much my funky experiments would cost. Then I heard about [Amazon
ec2](http://aws.amazon.com/ec2/). They offer a free entry
configuration with Gigabytes of this and that.  ec2 boots and
maintains a virtual hobby computer for you. Somewhere in the Eastern
US. And maintains it. For free. How cool is that?

Well, there are some down sides. 

First, you have to tell ec2 what you want to put on the computer. And
it's not "Hey boot up linux ok?".  Fortunately
[rsms](http://rsms.me/2011/03/23/ec2-wep-app-template.html) detailed
instructions for both setting up ec2 and installing node. I did not
use his install scripts in the end, I want just node.js not nginx
proxy to node.js.

Second, you can't see your ec2 machine. You need to run it through
ssh. No problem once you sort out the keys part. Well except any
problems in files require editing with vi. 

Third, the ec2 machine has a url like
ec2-107-20-57-90.compute-1.amazonaws.com. Even my geeky friends won't
type that one. Fortunately I already use
[dyndns](http://dyn.com/). Just had to ponder CNAME for a bit to map
blog.johnjbarton.com to that other URL.

As soon as I had node installed I started with the [sudo npm
install](http://npmjs.org/) commands. Wow, very slick! Well it seemed
that way at first. To try out wheat I cloned
[howtonode](https://github.com/creationix/howtonode.org), the site
that demo's wheat. Fired up node in the howtonode directory using 
  node server/server.js
(I guess I must have edited the port number to 8080). Fail. 

Turns out npm does not account for versions in its dependency
tracking. So wheat croaked on the 0.5.3pre version of node I
installed. Uninstall. Reinstall node 0.4. Works. (But along they way
you have to remember to put the sudo in front all of the time.)

Works, but I don't want to host a copy of howtonode, I want my own
blog. And there are no docs on wheat configuration. So I copied the
howtonode files, deleted a bunch, and edited the rest. Launched wheat
in my directory. Fail.

Common sense would tell you to review which files you deleted and
edited. So of course I didn't do that.  I did what any developer would
do: start adding console.log statements until you see something come
out. 

At first I added console.log statements but I got nothing
out. Eventually I learned about
[node_module](http://nodejs.org/api/modules.html#loading_from_node_modules_Folders):
I had at least three copies of wheat and I wasn't editing the right
one.

Once I found the right files, more learning was in store. I learned
about 'routes' in node, which are regular expression filters on the
URL that fire JS handlers for content. I learned that wheat has
another template expansion system called HAML and it is driven by some
puzzling callbacks-are-confusing-fixer code. And I learned that I
deleted too many files and did not edit enough of them.

Finally I had my first Hello World blog page! But every time my home
computer goes to sleep it disconnects ssh and the site goes down. I
need some sort of background task solution. Of course node has a
solution, [Forever](https://github.com/indexzero/forever). One more
npm install later I typed 
  forever start server/server.js 
in my blog directory. I had a blog. 

Well I had a blog on port 8080. Woohoo, let's fire this
baby up on port 80! One vi edit on server.js and another forever command...

Gee, the site does not respond and the ssh command line is
laggy. 'top' says my CPU is pegged. Hmm. ec2 gives me 750 hours of CPU
time. 750/24 = 30. Ok so I don't have to panic, but this it not
good. It worked so well on port 8080...oh. I was in an infinite loop
of permission errors followed by forever recovery.

Final commands:
 forever stop server/server.js
 sudo forever start server/server.js
and I'm here.

jjb




