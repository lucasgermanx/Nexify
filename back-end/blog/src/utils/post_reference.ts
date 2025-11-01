export function postReferenceUtils(): string {
    const randomNumber = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(12, "0");
    return `post_${randomNumber}`;
  }
  