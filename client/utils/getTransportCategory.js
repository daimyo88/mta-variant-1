export default function getTransportCategory(w) {
    if (!w) {
        return '';
    }
    if(w > 0 && w < 2000) {
        return '0 - 1999';
    }
    if(w >= 2000 && w < 3300) {
        return '2000 - 3299';
    }
    if(w >= 3300 && w < 4500) {
        return '3300 - 4499';
    }
    if(w >= 4500 && w < 6500) {
        return '4500 - 6499';
    }
    if(w >= 6500) {
        return '6500+';
    }
}