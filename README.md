# Boolzapp

In this project I am replicating the layout and some of the functionality of the WhatsApp webapp.  
The project will be completed over the span of three separate milestones, and all three will be preserved in the repo separately in order to show my work at various stages of the project.

## Features

TBD

## Workflow

### Milestone 1

In this milestone I recreate the graphical interface of the webapp and populare the list of contacts dynamically with Vue.js.

JS:
1. Use v-for to populate the contact list with the relevant data. Use v-bind to access specific properties.

### Milestone 2

In this milestone I introduce dymanic visualization of messages for each contact on click.

1. Use v-for to populate the chat with the messages of the active contact.  
2. Add Luxon, create a method that reformats message times to show just the hours and minutes, use it to display the times in the message bubbles.  
3. Create a method that changes the contactIndex to match its argument. Use v-on to invoke the method when clicking on a contact in the contact list. This changes the active contact and displays their message history in the chat window.