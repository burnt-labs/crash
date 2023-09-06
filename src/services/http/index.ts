export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: {
    retries?: number;
    delay?: number;
    timeout?: number;
  } = {},
): Promise<Response> {
  const { retries = 3, delay = 1000, timeout = 10000 } = retryOptions;
  const controller = new AbortController();
  const signal = controller.signal;

  options = { ...options, signal };

  return new Promise((resolve, reject) => {
    const timeoutPromise = new Promise<void>((_, rej) => {
      setTimeout(() => {
        controller.abort(); // Abort the fetch request
        rej(new Error(`Request timed out after ${timeout}ms`));
      }, timeout);
    });

    const fetchPromise = new Promise<Response>((res, rej) => {
      const wrapper = async (attemptsRemaining: number): Promise<void> => {
        try {
          const response: Response = await fetch(url, options);

          if (!response.ok) {
            throw new Error(
              `Network response was not ok. Status: ${response.status} ${response.statusText}`,
            );
          }

          res(response);
        } catch (error) {
          if ((error as Error).name === 'AbortError') {
            // If the fetch was aborted, reject immediately
            rej(new Error(`Request was aborted after ${timeout}ms`));

            return;
          }

          if (attemptsRemaining > 1) {
            setTimeout(() => {
              wrapper(attemptsRemaining - 1);
            }, delay);
          } else {
            rej(error);
          }
        }
      };

      wrapper(retries);
    });

    Promise.race([fetchPromise, timeoutPromise])
      .then((response) => {
        resolve(response as Response);
      })
      .catch(reject);
  });
}
