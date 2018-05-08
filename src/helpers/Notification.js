import Alert from 'react-s-alert';

class Notification
{
    static success(text) {
        Alert.success(text, {
            position: 'top-right',
            effect: 'genie',
            beep: false,
            timeout: 5000,
        });
    }

    static error(text) {
        Alert.error(text, {
            position: 'top-right',
            effect: 'genie',
            beep: false,
            timeout: 5000,
        });
    }
}

export default Notification;
