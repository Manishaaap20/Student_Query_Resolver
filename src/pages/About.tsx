const About = () => (
  <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
    <h1 className="font-display text-3xl font-bold">About Grievances Portal</h1>
    <p className="mt-6 text-muted-foreground leading-relaxed">
      The Student Grievances Portal provides a transparent and efficient platform for students 
      to raise concerns, track resolution progress, and communicate with the relevant departments. 
      Our goal is to ensure every student voice is heard and addressed promptly.
    </p>
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {[
        { title: "Transparent", desc: "Track your grievance status in real-time" },
        { title: "Efficient", desc: "Direct routing to concerned staff" },
        { title: "Accountable", desc: "Upvote system to prioritize issues" },
      ].map((item) => (
        <div key={item.title} className="animate-fade-in rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-accent">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default About;
