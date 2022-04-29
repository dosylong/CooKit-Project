import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileTabs from '../../components/ProfileTabs';
import { Stack, Box } from '@chakra-ui/react';
import { auth, storage } from '../../../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import firebase from 'firebase/app';

export default function ProfilePage() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const user = JSON.parse(localStorage.getItem('account'));

  const updateAvatarUrl = async (url) => {
    const response = await userApi.editUserAvatar({
      photoURL: url,
      userFirebaseId: userId,
    });
    console.log(response);
  };

  const updateAvatar = async (url) => {
    const currentUser = auth.currentUser;
    currentUser
      .updateProfile({
        photoURL: url,
      })
      .then(() => {
        toast.success('Edited avatar successfully!', {
          autoClose: 1200,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1400);
        console.log('Updated avatar successfully!');
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const onDrop = async () => {
    const file = acceptedFiles[0];
    if (!file) {
      return toast.error('Cannot upload your avatar!', {
        autoClose: 1200,
      });
    }
    setIsLoading(true);
    try {
      const uploadTask = storage
        .ref(`avatars/${user?.email}/avatar/${file.name}`)
        .put(file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`avatars/${user?.email}/avatar/`)
            .child(file.name)
            .getDownloadURL()
            .then(async (url) => {
              updateAvatarUrl(url);
              updateAvatar(url);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: 'image/jpeg, image/png, image/jpg',
      maxFiles: 1,
      onDrop,
    });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userApi.getUserProfile({
          userFirebaseId: userId,
        });
        setUserProfile(response);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [userId]);

  const onClickEditInfo = async (values) => {
    try {
      await userApi
        .editUserProfile({
          userFirebaseId: userId,
          fullName: values.fullName,
          bio: values.bio,
        })
        .then(() => {
          toast.success('Edited profile successfully!', {
            autoClose: 1200,
          });
        });

      await auth.currentUser
        .updateProfile({
          displayName: values.fullName,
        })
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        window.location.reload();
      }, 1400);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickChangePassword = async (values) => {
    try {
      const credentials = firebase.auth.EmailAuthProvider.credential(
        auth.currentUser.email,
        values.password
      );
      await auth.currentUser.reauthenticateWithCredential(credentials);

      await auth.currentUser.updatePassword(values.newPassword).then(() => {
        toast.success('Edited password successfully!', {
          autoClose: 1200,
        });
      });
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error('Current password is wrong!', {
          autoClose: 1200,
        });
      }
    }
  };

  return (
    <div>
      <Stack spacing='0' direction={['column', 'row']}>
        <Box flex='0'>
          <ProfileInfoCard userProfile={userProfile} />
        </Box>

        <Box flex='1'>
          <ProfileTabs
            userProfile={userProfile}
            user={user}
            onClickEditInfo={onClickEditInfo}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            isLoading={isLoading}
            onClickChangePassword={onClickChangePassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </Box>
      </Stack>
      <ToastContainer />
    </div>
  );
}
