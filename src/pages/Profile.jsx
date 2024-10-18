import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    profilePic: 'https://via.placeholder.com/150', // Placeholder image
    name: 'Asanda',
    surname: 'Madondo',
    email: 'Portia949@gmail.com',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePic: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditToggle = () => setEditMode(!editMode);

  const handleSave = () => {
    // Save changes logic here
    setEditMode(false);
  };

  return (
    <section className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-xl">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            {editMode && (
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.name} {profile.surname}
          </h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>

        <div className="mt-6">
          {editMode ? (
            <>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="surname"
                  value={profile.surname}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Favourites and History Buttons */}
        <div className="mt-6 flex justify-around">
          <button
            onClick={() => navigate('/favourites')} // Navigate to Favourites page
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            View Favourites
          </button>
          <button
            onClick={() => navigate('/history')} // Navigate to History page
            className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
          >
            View History
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;







// import React, { useState } from 'react';
// import {
//   styled,
//   Card,
//   CardHeader,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Collapse,
//   Avatar,
//   IconButton,
//   Typography
// } from '@mui/material';
// import { red } from '@mui/material/colors';
// import {
//   Favorite as FavoriteIcon,
//   Share as ShareIcon,
//   ExpandMore as ExpandMoreIcon,
//   MoreVert as MoreVertIcon
// } from '@mui/icons-material';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
//   transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
// }));

// export default function RecipeReviewCard() {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div style={{minHeight: "100vh"}} >
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image="/src/assets/image.png"
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the mussels,
//           if you like.
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
//           <Typography sx={{ marginBottom: 2 }}>
//             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
//             aside for 10 minutes.
//           </Typography>
//           <Typography sx={{ marginBottom: 2 }}>
//             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
//             medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
//             occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
//             large plate and set aside, leaving chicken and chorizo in the pan. Add
//             pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
//             stirring often until thickened and fragrant, about 10 minutes. Add
//             saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
//           </Typography>
//           <Typography sx={{ marginBottom: 2 }}>
//             Add rice and stir very gently to distribute. Top with artichokes and
//             peppers, and cook without stirring, until most of the liquid is absorbed,
//             15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
//             mussels, tucking them down into the rice, and cook again without
//             stirring, until mussels have opened and rice is just tender, 5 to 7
//             minutes more. (Discard any mussels that don&apos;t open.)
//           </Typography>
//           <Typography>
//             Set aside off of the heat to let rest for 10 minutes, and then serve.
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//     </div>
//   );
// }
