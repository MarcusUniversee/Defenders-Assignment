import TextDisplay from '../linda/components/TextDisplay';
import './styles.css'
import { AnnotationTool } from '../linda/components/TextDisplay';

const App = () => {
  const sampleText = `
PSA - Diversatech Is Not What It Seems.

Just a PSA for anyone who wants to apply to Diversatech in the future, I would say that the ppl there generally push the image of being a wholesome and inclusive community, but in reality it's a facade and it's filled with people that put on that weird, fake smiley persona.

Met quite a few cold and fake ppl that are members of the club in the infosessions that they held. Also they push the diversity thing but in reality it's 90% privileged East Asian and South Asian people lmfao. Found out from one of the officers in the club that a good amount of the people that got accepted this cycle were either MET and GMP students or people that they already know (nepotism). Yass slay with the diversity!!

I know the "someone got rejected" comments are incoming, but it's not about that - I got rejected from a ton of clubs. I'm honestly just trying to warn ppl abt this club specifically because it is starkly different from what they portray publicly.

Again, not a hate post, just a warning for anyone that is considering joining this club in the future that think that it'll be a uniquely welcoming and diverse group of people in the consulting scene. It is not - it's just like any other consulting club, and is ironically even less diverse than other ones lmao.
  `;

  return (
    <AnnotationTool text={sampleText} />
  );
};

export default App;
