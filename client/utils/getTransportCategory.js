export default function getTransportCategory(w) {
    if (!w) {
        return '';
    }
    if(w > 0 && w < 1) {
        return '< 1';
    }
    if(w >= 1 && w < 5) {
        return '1 - 5';
    }
    if(w >= 5 && w < 10) {
        return '5 - 10';
    }
    if(w >= 10 && w < 20) {
        return '10 - 20';
    }
    if(w >= 20) {
        return '20+';
    }
}