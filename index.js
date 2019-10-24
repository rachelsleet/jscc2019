/*
Social-driven Kickstarter where support can come with money OR time.
Project campaign doesn't have to require a real pitch/be fully fleshed out yet.
 */

Idea = class {
  constructor(title, creator, details = '') {
    this.title = title;
    this.details = details;
    this.creator = creator;
    this.supporters = { financial: [], time: [] };
    this.comments = [];

    creator.ownIdeas.push(this);
  }

  printIdea() {
    console.log(
      `${this.title} by ${this.creator.name}\n\n${this.details ||
        'More details coming soon...'}\n\nMany thanks to the supporters:\n${[
        ...this.supporters.financial,
        ...this.supporters.time
      ]
        .map(s => s.name)
        .join(', ')}`
    );
  }

  printComments(n = this.comments.length) {
    console.log(
      this.comments
        .map(c => `${c.message}\n${c.author.name}, ${c.time.toString()}`)
        .slice(0, n)
        .join('\n\n')
    );
  }
};

Person = class {
  constructor(name, bio = '') {
    this.name = name;
    this.bio = bio;
    this.ownIdeas = [];
    this.supportedIdeas = { financial: [], time: [] };
  }

  supportIdea(idea, type) {
    idea.supporters[type].push(this);
    this.supportedIdeas[type].push(idea);
  }

  commentOnIdea(idea, message) {
    idea.comments.push({ author: this, message, time: new Date() });
  }
};

rachel = new Person('Rachel', 'Budding developer in Berlin');
cleanUp = new Idea('Clean up the streets!', rachel);

christian = new Person('Christian');
christian.supportIdea(cleanUp, 'time');

christian.commentOnIdea(
  cleanUp,
  "Nice idea! I'm a graphic designer, do you need any materials?"
);
rachel.commentOnIdea(
  cleanUp,
  "Thanks, yes that would be amazing. Let's set up coffee to discuss details."
);

cleanUp.printIdea();
cleanUp.printComments();

console.log(rachel, christian, cleanUp);
