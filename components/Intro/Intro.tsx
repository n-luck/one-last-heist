import { Link } from "../Link";

export const Intro = () => {
  return (
    <div className="space-y-2 mb-6">
      <h1 className="h1-bold mb-4">Welcome to the family...</h1>
      <p>
        One Last Heist is a campaign set in the world of &apos;A Family of
        Blades&apos; tabletop roleplaying game, about a team of criminals who
        became a family, broke up, and have now been thrust back together for
        one last job.
      </p>
      <p>
        <Link href="https://ac-luke.itch.io/family-of-blades">Here</Link>{" "}
        you&apos;ll find all the rules & Co.
      </p>
    </div>
  );
};
