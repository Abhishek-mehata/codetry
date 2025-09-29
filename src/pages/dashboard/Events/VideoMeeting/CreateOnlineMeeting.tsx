import { useEffect, useState } from 'react';
import { Button } from '../../../../components';
import { Link } from 'react-router-dom';
import { updateEvent } from '../../../../redux/actions/events';
import { useAppDispatch } from '../../../../hooks/useTypedSelectors';

type CreateOnlineMeetingProps = {
  eventId: string;
  onlineEvent: {
    link?: string;
  } | undefined;
  userRole?: 'SELLER' | 'BUYER' | 'ADMIN'; // Kept for compatibility, but not used for host logic
};

const CreateOnlineMeeting = ({ eventId, onlineEvent, userRole }: CreateOnlineMeetingProps) => {
  console.log(userRole, "userRole in CreateOnlineMeeting");
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [hostToken, setHostToken] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_DAILY_API_KEY;
  const dispatch = useAppDispatch();
  const hasEventLink = onlineEvent?.link;

  // Create a new Daily.co room
  const createRoom = async () => {
    try {
      const response = await fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          name: `room-${Date.now()}`,
          privacy: 'public',
        }),
      });
      const data = await response.json();

      if (response.ok && data.url) {
        await dispatch(updateEvent({ onlineEvent: { link: data.url } }, eventId));
        setRoomUrl(data.url);
      } else {
        alert('Failed to create room.');
      }
    } catch (error) {
      alert('Error creating room.');
      console.error(error);
    }
  };

  // Generate a host token for any user
  const generateHostToken = async (roomUrl: string) => {
    try {
      const response = await fetch('https://api.daily.co/v1/meeting-tokens', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          properties: {
            room_name: roomUrl.split('/').pop(), // Extract room name from URL
            is_owner: true, // Set as host
          },
        }),
      });
      const data = await response.json();
      if (data.token) {
        setHostToken(data.token);
      } else {
        console.log('Failed to generate host token.');
      }
    } catch (error) {
      console.log('Error generating host token.');
      console.error(error);
    }
  };

  // Generate host token when roomUrl or hasEventLink is available
  useEffect(() => {
    if (hasEventLink || roomUrl) {
      generateHostToken(hasEventLink || roomUrl!);
    }
  }, [hasEventLink, roomUrl]);

  // Construct the join URL with host token for all users
  const joinUrl = hostToken ? `${hasEventLink || roomUrl}?token=${hostToken}` : hasEventLink || roomUrl || '';

  return (
    <div className="mt-4">
      {!roomUrl && !hasEventLink ? (
        <Button onClick={createRoom}>Create Online Meeting</Button>
      ) : (
        <>
          <Link
            className="px-4 py-3 text-white rounded-md bg-success"
            to={joinUrl}
          >
            Join Event as Host
          </Link>
        </>
      )}
    </div>
  );
};

export default CreateOnlineMeeting;