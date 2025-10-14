export default function Resources() {
  return (
    <div>
      <section className="card">
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="subtitle">Curated links and guides for common student challenges.</p>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Academic Stress</h2>
        <ul className="list">
          <li><a className="text-primary underline" href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/" target="_blank" rel="noopener">Understanding stress</a></li>
          <li><a className="text-primary underline" href="https://www.youtube.com/results?search_query=pomodoro+study" target="_blank" rel="noopener">Pomodoro study techniques</a></li>
          <li><a className="text-primary underline" href="https://www.coursera.org/" target="_blank" rel="noopener">Free online courses (Coursera)</a></li>
        </ul>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Financial Stress</h2>
        <ul className="list">
          <li><a className="text-primary underline" href="https://www.nerdwallet.com/article/finance/how-to-budget" target="_blank" rel="noopener">How to budget</a></li>
          <li><a className="text-primary underline" href="https://www.reddit.com/r/personalfinance/" target="_blank" rel="noopener">Personal finance community</a></li>
          <li><a className="text-primary underline" href="https://www.khanacademy.org/college-careers-more/personal-finance" target="_blank" rel="noopener">Personal finance basics (Khan Academy)</a></li>
        </ul>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Emotional Well-being</h2>
        <ul className="list">
          <li><a className="text-primary underline" href="https://www.headspace.com/meditation/meditation-for-beginners" target="_blank" rel="noopener">Meditation for beginners</a></li>
          <li><a className="text-primary underline" href="https://www.healthline.com/health/grounding-techniques" target="_blank" rel="noopener">Grounding techniques</a></li>
          <li><a className="text-primary underline" href="https://988lifeline.org/" target="_blank" rel="noopener">988 Suicide & Crisis Lifeline (US)</a></li>
        </ul>
      </section>
    </div>
  )
}


