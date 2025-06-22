import { Box, Typography, Chip, Stack, Tooltip } from '@mui/material';
import { useHighlight } from '../context/HighlightContext';
import { situations } from '../data/situations';

// Amazon Leadership Principles descriptions from https://www.amazon.jobs/content/en/our-workplace/leadership-principles
const leadershipPrincipleDescriptions = {
  'Customer Obsession': 'Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.',
  'Ownership': 'Leaders are owners. They think long term and don\'t sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team. They never say "that\'s not my job."',
  'Invent and Simplify': 'Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by "not invented here." As we do new things, we accept that we may be misunderstood for long periods of time.',
  'Are Right, A Lot': 'Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.',
  'Learn and Be Curious': 'Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.',
  'Hire and Develop the Best': 'Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization. Leaders develop leaders and take seriously their role in coaching others.',
  'Insist on the Highest Standards': 'Leaders have relentlessly high standards — many people may think these standards are unreasonably high. Leaders are continually raising the bar and drive their teams to deliver high quality products, services, and processes.',
  'Think Big': 'Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.',
  'Bias for Action': 'Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.',
  'Frugality': 'Accomplish more with less. Constraints breed resourcefulness, self-sufficiency, and invention. There are no extra points for growing headcount, budget size, or fixed expense.',
  'Earn Trust': 'Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when doing so is awkward or embarrassing. Leaders do not believe their or their team\'s body odor smells of perfume. They benchmark themselves and their teams against the best.',
  'Dive Deep': 'Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdote differ. No task is beneath them.',
  'Have Backbone; Disagree and Commit': 'Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly.',
  'Deliver Results': 'Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle.',
  'Strive to be Earth\'s Best Employer': 'Leaders work every day to create a safer, more productive, higher performing, more diverse, and more just work environment. They lead with empathy, have fun at work, and make it easy for others to have fun.',
  'Success and Scale Bring Broad Responsibility': 'We started in a garage, but we\'re not there anymore. We are big, we impact the world, and we are far from perfect. We must be humble and thoughtful about even the secondary effects of our actions.'
};

function SituationsSection() {
  const { highlightedPrinciple } = useHighlight();

  const isHighlighted = (situation) => {
    if (!highlightedPrinciple) return false;
    return situation.principles.some(principle => 
      principle.toLowerCase() === highlightedPrinciple.toLowerCase()
    );
  };

  const renderSTARDetails = (situation) => {
    return (
      <Box mt={2}>
        <Box mb={2}>
          <Typography variant="subtitle2" color="primary" fontWeight={600} gutterBottom>
            Situation:
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            {situation.situation}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="primary" fontWeight={600} gutterBottom>
            Task:
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            {situation.task}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="primary" fontWeight={600} gutterBottom>
            Action:
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            {situation.action}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="primary" fontWeight={600} gutterBottom>
            Result:
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            {situation.result}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box mb={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Situations
      </Typography>
      {situations.map((situation, index) => (
        <Box 
          key={situation.title}
          id={`situation-${index}`}
          mb={2}
          sx={{
            p: 2,
            borderRadius: 1,
            transition: 'all 0.3s ease-in-out',
            bgcolor: isHighlighted(situation) ? 'action.hover' : 'transparent',
            transform: isHighlighted(situation) ? 'scale(1.02)' : 'scale(1)',
            boxShadow: isHighlighted(situation) ? 2 : 0
          }}
        >
          <Typography variant="h6">{situation.title}</Typography>
          
          <Box mt={2}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Leadership Principles:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {situation.principles.map((principle) => (
                <Tooltip
                  key={principle}
                  title={leadershipPrincipleDescriptions[principle] || principle}
                  placement="top"
                  arrow
                  sx={{
                    maxWidth: 400,
                    '& .MuiTooltip-tooltip': {
                      fontSize: '0.875rem',
                      lineHeight: 1.4,
                      padding: 2
                    }
                  }}
                >
                  <Chip
                    label={principle}
                    size="small"
                    variant="outlined"
                    onClick={() => {}} // Empty onClick function to prevent error
                    sx={{ 
                      m: 0.5,
                      bgcolor: isHighlighted(situation) && principle.toLowerCase() === highlightedPrinciple?.toLowerCase()
                        ? 'primary.main'
                        : 'transparent',
                      color: isHighlighted(situation) && principle.toLowerCase() === highlightedPrinciple?.toLowerCase()
                        ? 'primary.contrastText'
                        : 'inherit'
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>
          
          {renderSTARDetails(situation)}
        </Box>
      ))}
    </Box>
  );
}

export default SituationsSection; 