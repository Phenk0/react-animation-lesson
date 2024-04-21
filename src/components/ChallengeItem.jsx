import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChallengesContext } from "../store/challenges-context.jsx";

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, "failed");
  }

  function handleComplete() {
    updateChallengeStatus(challenge.id, "completed");
  }

  return (
    <motion.li layout exit={{ y: "-2rem", opacity: 0 }}>
      <article className="challenge-item">
        <header>
          <img {...challenge.image} />
          <div className="challenge-item-meta">
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className="challenge-item-actions">
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        <div className="challenge-item-details">
          <p>
            <button onClick={onViewDetails}>
              View Details{" "}
              <motion.span
                className="challenge-item-details-icon"
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                &#9650;
              </motion.span>
            </button>
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={{
                  hidden: { height: 0, y: "-1rem", opacity: 0 },
                  visible: { height: "auto" },
                  visibleDelay: {
                    y: 0,
                    opacity: 1,
                    transition: { delay: 0.1 },
                  },
                }}
                initial="hidden"
                exit="hidden"
                animate={["visible", "visibleDelay"]}
              >
                <p className="challenge-item-description">
                  {challenge.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
