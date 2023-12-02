'use strict';

// Luxon
const DateTime = luxon.DateTime;

// Vue.js
const { createApp } = Vue;

createApp({
  data() {
    return {
      // Utility
      splash: true,
      contactIndex: null,
      newMsg: '',
      contactSearch: '',
      currentDropdown: '',
      mainHeaderDropdown: false,
      userStatus: '',
      bigFont: false,
      darkMode: true,
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
      ],
      randomResponses: [
        'Come annunciò la profezia.',
        'Ma a quale prezzo?',
        'E sia.',
        'Così… siamo giunti a questo.',
        'È per questo che il destino ci ha fatti incontrare?',
        'Secondo gli antichi patti, eseguirò.',
        '…esattamente come nel mio sogno!',
        'In questa economia?',
        'Per i poteri a me conferiti, acconsento.',
        '…e fu allora che giunsero i lupi.'
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
      this.updateUserStatus();
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
        this.userStatus = 'sta scrivendo...';
        setTimeout(this.autoResponse, 1000);
        setTimeout(this.updateUserStatus, 3000);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    // Get automatic response
    autoResponse() {
      this.contacts[this.contactIndex].messages.push({
        date: this.getCurrentTime(),
        message: this.randomResponses[Math.floor(Math.random() * this.randomResponses.length)],
        status: 'received'
      });
      this.userStatus = 'online';
    },
    // Toggle message menu dropdown
    toggleDropdown(contactIndex, messageIndex) {
      const key = `${contactIndex}-${messageIndex}`;
      this.currentDropdown = this.currentDropdown === key ? '' : key;
      // Prevent immediately closing the dropdown
      event.stopPropagation();
    },
    // Message deletion
    deleteMessage(contactIndex, messageIndex) {
      this.contacts[contactIndex].messages.splice(messageIndex, 1);
      this.currentDropdown = '';
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
    },
    // Get the time (HH:mm) of the active contact's last received message, ignoring sent messages
    getLastReceivedMessageTime() {
      const messages = this.contacts[this.contactIndex].messages;
      const lastReceivedMsg = messages.slice().reverse().find(msg => msg.status === 'received');
      return lastReceivedMsg ? this.displayTime(lastReceivedMsg.date) : null;
    },
    // When called, update userStatus to display the time of the last received message from the active contact; if no received messages, display appropriate string
    updateUserStatus() {
      const lastReceivedTime = this.getLastReceivedMessageTime();
      if (lastReceivedTime) {
        this.userStatus = 'ultimo accesso alle ' + lastReceivedTime;
      } else {
        this.userStatus = 'Nessun accesso precedente';
      }
    },
    // Delete all messages with the active contact
    deleteAllMsgs() {
      this.contacts[this.contactIndex].messages = [];
    },
    // Delete conversation with the active contact and set contactIndex to 0
    deleteChat() {
      this.contacts.splice(this.contactIndex, 1);
      this.contactIndex = 0;
    },
    // Create a new conversation and add it to the contact list
    addNewChat() {
      const contactName = prompt('Name:');
      const contactImg = prompt('Profile picture url:');
      if (contactName.trim() !== '') {
        this.contacts.unshift({
          name: contactName,
          avatar: contactImg,
          visible: true,
          messages: []
        });
      }
    },
    // Scrolls to the bottom of the chat-window div
    scrollToBottom() {
      const container = this.$refs.chatwindow;
      container.scrollTop = container.scrollHeight + 1000;
    },
    // Close chat header dropdown menu on click outside
    mainHeaderDropdowClickOutside(event) {
      if (this.$refs.mainHeaderDropdownMenu && !this.$refs.mainHeaderDropdownMenu.contains(event.target)) {
        this.mainHeaderDropdown = false;
      }
    },
    // Handle clicks outside dynamically generated message dropdowns
    handleClickOutsideDynamicDropdowns(event) {
      // Select dropdowns
      if (this.currentDropdown) {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        let isClickInsideDropdown = false;
        // Track whether the click is inside the dropdown
        dropdowns.forEach((dropdown) => {
          if (dropdown.contains(event.target)) {
            isClickInsideDropdown = true;
          }
        });
        // If the click is outside, empty currentDropdown
        if (!isClickInsideDropdown) {
          this.currentDropdown = '';
        }
      }
    }
  },
  mounted() {
    // Update active contact status for the first time after mounting the application
    // this.updateUserStatus();
    // Add event listener to handle closing the chat header dropdown menu on click outside
    document.addEventListener('click', this.mainHeaderDropdowClickOutside);
    // Add event listener to handle closing message dropdowns on click outside
    document.addEventListener('click', this.handleClickOutsideDynamicDropdowns);
    // Hide splash page after one second
    setTimeout(() => {
      this.splash = false;
    }, 1000);
  },
  beforeUnmount() {
    // Remove event listeners before unmount to prevent memory leaks
    document.removeEventListener('click', this.mainHeaderDropdowClickOutside);
    document.removeEventListener('click', this.handleClickOutsideDynamicDropdowns);
  }
}).mount('#app');