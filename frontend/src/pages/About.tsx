export default function About() {
  return (
    <section className="card">
      <h1 className="text-2xl font-bold">About Mindly</h1>
      <p className="subtitle">Our mission is to make mental wellness approachable for students.</p>
      <p>Mindly is a student-first mental wellness companion that blends an empathetic AI assistant with interactive tools and a thoughtful, accessible UI. Small steps add up: Mindly helps you reflect, find practical tips, and reach professional support when you want it.</p>
      <ul className="list mt-2">
        <li>Clean, calming design with light and dark modes</li>
        <li>Empathetic chatbot for supportive guidance (no diagnosis)</li>
        <li>Interactive Questionnaire: PHQ (Depression), GHQ (Anxiety), PSS (Stress), UCLA (Social), plus Financial Stress and Academic Motivation</li>
        <li>Animated progress and summaries with local save, retake, and history</li>
        <li>High-contrast buttons and readable navigation in both themes</li>
        <li>Curated resources for academic, financial, and emotional support</li>
        <li>Quick access to book a counselor when you’re ready</li>
      </ul>

      <div className="card">
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="subtitle">Keep your data in your control.</p>
        <ul className="list mt-2">
          <li>Questionnaire answers are saved locally on your device for your history.</li>
          <li>You can clear history or retake the questionnaire anytime.</li>
          <li>Optionally, the latest questionnaire can be sent to the backend via a simple API for future personalization. No chatbot changes are required by default.</li>
        </ul>
      </div>

      {/** Tech section intentionally removed as requested **/}
    </section>
  )
}


