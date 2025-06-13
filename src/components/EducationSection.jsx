import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { education } from '../data/education';

function EducationSection() {
  return (
    <Box mb={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Education
      </Typography>
      {education.map((edu, index) => (
        <Box key={edu.degree} sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            {edu.degree}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {edu.school} | {edu.period}
          </Typography>
          
          <List dense>
            {edu.description.map((item, i) => (
              <ListItem key={i} sx={{ py: 0.5 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>

          {edu.achievements && edu.achievements.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Achievements
              </Typography>
              <List dense>
                {edu.achievements.map((achievement, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemText primary={achievement} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default EducationSection; 