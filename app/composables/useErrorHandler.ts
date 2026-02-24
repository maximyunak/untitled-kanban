import { FetchError } from 'ofetch';

export const useErrorHandler = () => {
  const toast = useToast()

  const handleError = (error: unknown) => {
    if (error instanceof FetchError) {
      const res = error?.response?._data;

      const message = Array.isArray(res?.message) ? res.message.join('/n') : res.message;

      toast.add({
        title: message,
        color: 'error',
      });
      return res
    }
    return error
  }

  return { handleError }
}
