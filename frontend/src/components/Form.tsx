import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

import styles from './form.module.scss';

type FormErrorState = {
  hasError: boolean;
  message: string;
};

const getFormTokenUrl = () => {
  const rawUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_URL ?? '';
  if (!rawUrl) return '';

  return rawUrl.replace(/\/send\/mail\/?$/, '/send/form-token');
};

export default function Form() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingToken, setIsFetchingToken] = useState(true);
  const [formToken, setFormToken] = useState('');
  const [hasError, setHasError] = useState<FormErrorState>({
    hasError: false,
    message: '',
  });

  useEffect(() => {
    let active = true;

    async function fetchFormToken() {
      const tokenUrl = getFormTokenUrl();

      if (!tokenUrl) {
        setHasError({
          hasError: true,
          message: 'The contact form endpoint is not configured.',
        });
        setIsFetchingToken(false);
        return;
      }

      try {
        const response = await fetch(tokenUrl, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            Accept: 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok || !data?.token) {
          throw new Error(data?.message || 'Unable to load form security token.');
        }

        if (active) {
          setFormToken(data.token);
          setHasError({
            hasError: false,
            message: '',
          });
        }
      } catch (error: any) {
        if (active) {
          setHasError({
            hasError: true,
            message: error?.message || 'Unable to load form security token.',
          });
        }
      } finally {
        if (active) {
          setIsFetchingToken(false);
        }
      }
    }

    fetchFormToken();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formToken) {
      setHasError({
        hasError: true,
        message: 'Please wait for the form to finish loading and try again.',
      });
      return;
    }

    setIsLoading(true);
    setHasError({
      hasError: false,
      message: '',
    });

    const formData = new FormData(e.currentTarget);

    const rawFormData = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      website: String(formData.get('website') ?? '').trim(),
      formToken,
    };

    try {
      const url = process.env.NEXT_PUBLIC_CONTACT_FORM_URL as string;

      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(rawFormData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setHasError({
          hasError: true,
          message: data?.message || 'There was an error, please try again later',
        });
        return;
      }

      if (data?.code === 201 || response.status === 201) {
        setHasSubmitted(true);
        setHasError({
          hasError: false,
          message: '',
        });
        return;
      }

      setHasError({
        hasError: true,
        message: data?.message || 'There was an error, please try again later',
      });
    } catch (error: any) {
      setHasError({
        hasError: true,
        message: error?.message || 'There was an error, please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.formWrapper}>
      {isLoading && <LoadingSpinner />}

      {hasError.hasError && (
        <div className={styles.errorMessageWrapper}>
          <p>Looks like we had an issue sending the email!</p>
          <p>{hasError.message || 'Please try again later or contact via phone.'}</p>
        </div>
      )}

      <h3>Contact via email</h3>

      {!hasSubmitted && (
        <form
          onSubmit={handleSubmit}
          id="contact"
          className={styles.form}
        >
          <fieldset disabled={isLoading || isFetchingToken}>
            <input
              type="hidden"
              name="formToken"
              value={formToken}
            />

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              defaultValue=""
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
              }}
            />

            <label id="name" htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                required
                className={hasError.hasError ? styles.hasError : ''}
              />
            </label>

            <label id="email" htmlFor="email">
              Email:
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className={hasError.hasError ? styles.hasError : ''}
              />
            </label>

            <label id="message" htmlFor="message">
              Message:
              <textarea
                id="message"
                name="message"
                required
                className={hasError.hasError ? styles.hasError : ''}
              ></textarea>
            </label>

            <button type="submit" disabled={isLoading || isFetchingToken}>
              {isFetchingToken ? 'Loading…' : 'Submit'}
            </button>
          </fieldset>
        </form>
      )}

      {hasSubmitted && (
        <div>
          <h4>Thank you!</h4>
          <p>We will be in contact with you as soon as we can!</p>
        </div>
      )}
    </div>
  );
}