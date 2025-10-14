import { FormEvent, useRef, useState } from 'react'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return
    if (!form.reportValidity()) return
    setStatus('Thanks! Your message has been recorded locally.')
    form.reset()
  }

  return (
    <section className="card">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="subtitle">We’d love to hear your feedback.</p>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="font-semibold" htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your name" required />
        </div>
        <div>
          <label className="font-semibold" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <label className="font-semibold" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} placeholder="How can we help?" required />
        </div>
        <button className="btn" type="submit">Send</button>
      </form>
      {status && <p className="subtitle mt-2" role="status">{status}</p>}
    </section>
  )
}


