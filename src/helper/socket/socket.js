import socketIOClient from 'socket.io-client';
import toast from 'toastr';
import { addNotification } from '../../redux/actionCreator/notificationsActions';
import store from '../../redux/store/store';
import { resolveBaseUrl } from '../../services';
import notificationSound from '../../sounds/notification.mp3';

const baseUrl = resolveBaseUrl();

const serverUrl = baseUrl.replace('/api/v1', '');

export const io = socketIOClient(serverUrl, {transports: ['websocket', 'polling']});

export default function handleManagerNotification({ UserInfo: { id, name } }) {
  io.on('notification', (data) => {
    if (data.recipientId === id) {
      const { senderName, message } = data;
      const msg = new RegExp(name).test(message) ? message : `${senderName} ${message}`;
      store.dispatch(addNotification(data));
      (message === 'rejected your request')
        ? toast.error(`${senderName} ${message}`)
        : toast.success(msg);
      let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      const audio = new Audio(notificationSound);
      if(!isSafari){
        audio.play();
      }
    }
  });
}
