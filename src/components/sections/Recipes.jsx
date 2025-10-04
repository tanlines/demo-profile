import React, { useState } from 'react';
import { Box, Typography, Modal, Card, CardMedia, CardContent, List, ListItem, ListItemText, IconButton, useTheme, Select, MenuItem, FormControl, InputLabel, Menu } from '@mui/material';
import { Close as CloseIcon, SwapHoriz as SubstituteIcon, MoreVert as MenuIcon } from '@mui/icons-material';
import { recipes } from '../../data/recipes';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

// import required modules
import { Grid, Pagination } from 'swiper/modules';

// RecipeCard Component
function RecipeCard({ recipe, onImageClick }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '300px',
        height: '100%',
        minHeight: { xs: '200px', sm: '250px' },
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        backgroundImage: `url(${recipe.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: 2,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 8px 32px rgba(255, 255, 255, 0.1)' 
            : '0 8px 32px rgba(0, 0, 0, 0.2)'
        }
      }}
      onClick={() => onImageClick(recipe)}
    >
      {/* Dark overlay for better text readability */}
      <Box
        sx={{
          bottom: 0,
          left: 0,
          right: 0,
          p: 2
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            fontFamily: '"Roboto Black", "Arial Black", "Helvetica Neue", Arial, sans-serif',
            color: 'white',
            fontSize: { xs: '1.35rem', sm: '1.875rem' },
            textShadow: '1px 2px 0 rgba(0, 0, 0, 0.8)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          {recipe.title}
        </Typography>
      </Box>
    </Box>
  );
}

// RecipeModal Component
function RecipeModal({ open, onClose, selectedRecipe }) {
  const theme = useTheme();
  const [servings, setServings] = useState(4);
  const [expandedSubstitutes, setExpandedSubstitutes] = useState(new Set());
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  const handleClose = () => {
    onClose();
    setServings(4);
    setExpandedSubstitutes(new Set());
    setCheckedIngredients(new Set());
  };

  const toggleSubstitute = (index) => {
    const newExpanded = new Set(expandedSubstitutes);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSubstitutes(newExpanded);
  };

  const roundToSensible = (value) => {
    if (value < 0.25) return 0.25;
    if (value < 0.5) return 0.5;
    if (value < 0.75) return 0.75;
    if (value < 1) return 1;
    if (value < 1.5) return 1.5;
    if (value < 2) return 2;
    if (value < 3) return Math.round(value);
    if (value < 5) return Math.round(value * 2) / 2;
    if (value < 10) return Math.round(value);
    if (value < 50) return Math.round(value / 5) * 5;
    if (value < 100) return Math.round(value / 10) * 10;
    return Math.round(value / 25) * 25;
  };

  const getScaledAmount = (ingredient) => {
    if (typeof ingredient.amount === 'string') {
      return ingredient.amount;
    }
    
    const scaledValue = ingredient.amount.value * servings;
    const roundedValue = roundToSensible(scaledValue);
    
    return `${roundedValue}${ingredient.amount.unit ? ' ' + ingredient.amount.unit : ''}`;
  };

  const toggleChecked = (index) => {
    const next = new Set(checkedIngredients);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setCheckedIngredients(next);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '95%', sm: '80%', md: '600px' },
          maxHeight: '90vh',
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'white',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'auto',
          outline: 'none'
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {selectedRecipe && (
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? 'white' : 'black'
              }}
            >
              {selectedRecipe.title}
            </Typography>
            

            <Box
              component="img"
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              sx={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: 1,
                mb: 3
              }}
            />

            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.mode === 'dark' ? 'white' : 'black'
                }}
              >
                Ingredients:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  sx={{
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <List dense>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <Box key={index}>
                  <ListItem 
                    onClick={() => toggleChecked(index)}
                    sx={{ 
                      py: 0.5, 
                      alignItems: 'flex-start', 
                      cursor: 'pointer', 
                      userSelect: 'none' 
                    }}
                  >
                    <ListItemText
                      primary={
                        typeof ingredient === 'string' 
                          ? ingredient 
                          : typeof ingredient.amount === 'string'
                            ? `${ingredient.amount} ${ingredient.item}`
                            : `${getScaledAmount(ingredient)} ${ingredient.item}`
                      }
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.95rem',
                          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                          textDecoration: checkedIngredients.has(index) ? 'line-through' : 'none',
                          opacity: checkedIngredients.has(index) ? 0.6 : 1
                        }
                      }}
                    />
                    {ingredient.substitute && (
                      <IconButton
                        size="small"
                        onClick={(e) => { e.stopPropagation(); toggleSubstitute(index); }}
                        sx={{
                          ml: 1,
                          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                          '&:hover': {
                            color: theme.palette.primary.main
                          }
                        }}
                      >
                        <SubstituteIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Box sx={{ ml: 0.5 }}>
                      <LinkMenu query={ingredient.item} />
                    </Box>
                  </ListItem>
                  {ingredient.substitute && expandedSubstitutes.has(index) && (
                    <Box sx={{ pl: 2, pb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.85rem',
                          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                          fontStyle: 'italic',
                          pl: 2,
                          borderLeft: `2px solid ${theme.palette.primary.main}40`
                        }}
                      >
                        Substitute: {ingredient.substitute}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </List>

            <Typography
              variant="h6"
              sx={{
                mb: 2,
                mt: 3,
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? 'white' : 'black'
              }}
            >
              Instructions:
            </Typography>
            <List dense>
              {selectedRecipe.instructions.map((instruction, index) => (
                <ListItem key={index} sx={{ py: 0.5, alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={`${index + 1}. ${instruction}`}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.95rem',
                        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

function LinkMenu({query}) {
  const links = [
    {
      link: "https://www.coles.com.au/search/products?q=",
      title: "Coles"
    },
    {
      link: "https://www.woolworths.com.au/shop/search/products?searchTerm=",
      title: "Woolworths"
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    // Prevent parent ListItem click handlers from firing
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleItemClick = (event, href) => {
    window.open(href, '_blank', 'noopener,noreferrer');
    handleClose(event);
  };

  return (
    <Box>
      <IconButton
        aria-label="open links menu"
        aria-controls={open ? 'links-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        size="small"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="links-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {links.map((l) => {
          const href = `${l.link}${encodeURI(query || '')}`;
          return (
            <MenuItem key={l.title} onClick={(event) => handleItemClick(event, href)}>
              {l.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}

function Recipes({ active = false }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        opacity: active ? 1 : 0.7,
        transition: 'opacity 0.3s ease'
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Swiper
          style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          slidesPerView={2}
          grid={{
            rows: 3
          }}
          spaceBetween={16}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
        >
          {recipes.map((recipe, index) => (
            <SwiperSlide key={index} style={{ maxWidth: '300px' }}>
              <RecipeCard 
                recipe={recipe} 
                onImageClick={handleImageClick} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <RecipeModal
        open={modalOpen}
        onClose={handleCloseModal}
        selectedRecipe={selectedRecipe}
      />
    </Box>
  );
}

export default Recipes;
