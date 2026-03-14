import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DubsSignInForm } from '../../src/components/sign-in-form';

describe('DubsSignInForm', () => {
  it('submits user credentials', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(async () => undefined);

    render(<DubsSignInForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'person@example.com');
    await user.type(screen.getByLabelText(/password/i), 'pass123456');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'person@example.com',
      password: 'pass123456',
    });
  });
});
