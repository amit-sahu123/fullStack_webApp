import React from 'react'
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const cards = [
  { title: 'Card title', subtitle: 'Card subtitle', image: 'assets/natureImg.jpeg' },
  { title: 'Card title', subtitle: 'Card subtitle', image: 'assets/natureImg.jpeg' },
  { title: 'Card title', subtitle: 'Card subtitle', image: 'assets/natureImg.jpeg' },
  { title: 'Card title', subtitle: 'Card subtitle', image: 'assets/natureImg.jpeg' },
  { title: 'Card title', subtitle: 'Card subtitle', image: 'assets/natureImg.jpeg' },
  { title: 'Card title', subtitle: 'Card subtitle', image: 'assets/natureImg.jpeg' }
];

function Blogs() {
  return (
    <div>
      <Container>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          {cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                </CardContent>
                <Button size="small">Button</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> 
    </div>
  )
}

export default Blogs
