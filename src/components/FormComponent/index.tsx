import React from 'react';

const FormComponent = React.forwardRef<
  HTMLFormElement,
  {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    customClassName?: string;
  }
>(({ onSubmit, children, customClassName }, ref) => (
  <form onSubmit={onSubmit} ref={ref} className={customClassName || 'w-full'}>
    {children}
  </form>
));

FormComponent.displayName = 'FormComponent';

export default FormComponent;
