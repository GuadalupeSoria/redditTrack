// src/components/DailyChecklist.tsx
import React from 'react';
import { List, ListItem, ListItemText, Checkbox, Typography } from '@mui/material';
import { PostRecord } from '../types';

interface DailyChecklistProps {
  records: PostRecord[];
  onUpdate: (record: PostRecord) => void;
}

const DailyChecklist: React.FC<DailyChecklistProps> = ({ records, onUpdate }) => {
  const handleToggle = (record: PostRecord) => () => {
    onUpdate({ ...record, completed: !record.completed });
  };

  const completedCount = records.filter(record => record.completed).length;

  return (
    <div className="space-y-4">
      <Typography variant="h6" className="font-bold">
        Daily Checklist ({completedCount}/{records.length})
      </Typography>
      <List className="bg-white rounded-lg shadow">
        {records.map((record) => (
          <ListItem
            key={record.title}
            component="li"  // Solución del error, se indica que es un li
            dense
            onClick={handleToggle(record)}
            className="hover:bg-gray-100"
          >
            <Checkbox
              edge="start"
              checked={record.completed}
              tabIndex={-1}
              disableRipple
              className="mr-2"
            />
            <ListItemText
              primary={record.title}
              secondary={`Subreddit: ${record.subreddit} | Views: ${record.views} | Upvotes: ${record.upvotes} | Comments: ${record.comments}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DailyChecklist;
