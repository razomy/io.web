/**
 * Debounce Function:
 * Only updates 'activeSearchQuery' 350ms after the user STOPS typing.
 */
export class Debounce {
  debounceTimeout: any = null;

  cancel() {
    clearTimeout(this.debounceTimeout);
  }

  debounce(cb: () => void, time: number) {
    if (this.debounceTimeout) this.cancel();

    this.debounceTimeout = setTimeout(cb, time); // 350ms delay
  }
}