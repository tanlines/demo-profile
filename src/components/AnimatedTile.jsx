import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function AnimatedTile({ title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ width: '100%', height: '100%' }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-4px)',
            transition: 'transform 0.2s ease-in-out'
          }
        }}
      >
        <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
}

export default AnimatedTile; 