const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const createNotification = (notification) => {
  return admin.firestore().collection('notifications').add(notification).then((doc) => {
    console.log('notification added: ', doc);
  })
}

exports.newUserJoined = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection('users').doc(user.uid).get().then((doc) => {
    const newUser = doc.data();
    const notification = {
      type: 'newUserJoined',
      content: 'Joined the group',
      user: `${newUser.firstName} ${newUser.lastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
  })
})

exports.messageCreated = functions.firestore.document('chats/{chatId}').onCreate((doc) => {
  const message = doc.data();
  const notification = {
    type: 'messageCreated',
    content: message.message,
    user: message.sender,
    receiver: message.receiver,
    time: admin.firestore.FieldValue.serverTimestamp()
  }
  return createNotification(notification);
})
