export default class HttpRequestDelegate {
  public static request(
    url: string,
    params: any,
    successCallback?: (data: any) => void,
    errorCallback?: () => void,
    finallyCallback?: () => void
  ): Promise<void> {
    params.credentials = 'include';
    return fetch(url, params).then((res: Response) => res.json())
      .then((data) => {
        if (successCallback) {
          successCallback(data);
        }
      })
      .catch(() => {
        if (errorCallback) {
          errorCallback();
        }
      })
      .then(() => {
        if (finallyCallback) {
          finallyCallback();
        }
      });
  }
}
