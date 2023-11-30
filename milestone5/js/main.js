'use strict';

// Luxon
const DateTime = luxon.DateTime;

// Vue.js
const { createApp } = Vue;

createApp({
  data() {
    return {
      // Utility
      contactIndex: 0,
      newMsg: '',
      contactSearch: '',
      dropdownsShown: {},
      // Data
      userData: {
        username: 'Sofia',
        avatar: './img/avatar_io.jpg',
      },
      contacts: [
        {
          name: 'Michele',
          avatar: './img/avatar_1.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio',
          avatar: './img/avatar_2.jpg',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Samuele',
          avatar: './img/avatar_3.jpg',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro B.',
          avatar: './img/avatar_4.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro L.',
          avatar: './img/avatar_5.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ],
        },
        {
          name: 'Claudia',
          avatar: './img/avatar_6.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Federico',
          avatar: './img/avatar_7.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Davide',
          avatar: './img/avatar_8.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
          ],
        }
      ]
    }
  },
  watch: {
    // Chat search watcher
    contactSearch(searchString) {
      const searchLowerCase = searchString.toLowerCase();
      this.contacts.forEach(contact => {
        contact.visible = contact.name.toLowerCase().includes(searchLowerCase);
      });
    },
  },
  methods: {
    // Time formatting for display
    displayTime(timestamp) {
      return DateTime.fromFormat(timestamp, 'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
    },
    // Get current time for new messages
    getCurrentTime() {
      return DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
    },
    // Select contact
    changeChat(index) {
      this.contactIndex = index;
    },
    // Send new message
    sendMsg() {
      if (this.newMsg.trim() !== '') {
        this.contacts[this.contactIndex].messages.push({
          date: this.getCurrentTime(),
          message: this.newMsg,
          status: 'sent'
        });
        this.newMsg = '';
        setTimeout(this.autoResponse, 1000);
      }
    },
    // Get automatic response
    autoResponse() {
      this.contacts[this.contactIndex].messages.push({
        date: this.getCurrentTime(),
        message: 'ok',
        status: 'received'
      });
    },
    // Toggle message menu dropdown
    toggleDropdown(contactIndex, messageIndex) {
      const key = `${contactIndex}-${messageIndex}`;
      if (this.dropdownsShown[key]) {
        this.dropdownsShown = {};
      } else {
        this.dropdownsShown = { [key]: true };
      }
    },
    // Message deletion
    deleteMessage(contactIndex, messageIndex) {
      this.contacts[contactIndex].messages.splice(messageIndex, 1);
      this.dropdownsShown = {};
    },
    // Get the time of the last message if sent today, otherwise, get the date
    getLastMessageTime(contact) {
      if (contact.messages.length === 0) {
        return '';
      }
      const lastMessage = contact.messages[contact.messages.length - 1];
      const messageTime = DateTime.fromFormat(lastMessage.date, 'dd/MM/yyyy HH:mm:ss');
      if (messageTime.hasSame(DateTime.now(), 'day')) {
        return messageTime.toFormat('HH:mm');
      } else {
        return messageTime.toFormat('dd/MM/yyyy');
      }
    },
    // Crop message to display it in contact list
    cropMessage(str) {
      if (str.length > 46) {
        return str.substring(0, 43) + '...';
      } else {
        return str;
      }
    }
  }
}).mount('#app');