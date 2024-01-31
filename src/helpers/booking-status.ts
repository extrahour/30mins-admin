
export const PENDING_REVIEW = 'PENDING_REVIEW';
export const CONFIRMED = 'CONFIRMED';
export const CANCELLED = 'CANCELLED';

export function statusToColor(status) {
    if (status === CANCELLED) {
        return 'error';
    }
    if (status === PENDING_REVIEW) {
        return 'warning';
    }
    return 'success';
}