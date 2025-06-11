import React from 'react';
import { Clock, Video, MapPin } from 'lucide-react';
import moment from 'moment';
import 'moment-timezone';

const MeetingInfo = ({ meetingInfo, selectedDate }) => {
  // Get the time zone abbreviation (e.g., "EDT", "PDT")
  const timeZoneAbbr = meetingInfo.timeZone
    ? moment.tz(meetingInfo.timeZone).zoneAbbr()
    : 'PST'; // Fallback to PST if timeZone is undefined

  return (
    <div className="col-span-12 lg:col-span-3 h-full">
      <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center">
              <img src="./favicon.svg" alt="Host Avatar" className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {meetingInfo.title}
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            {meetingInfo.description}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Clock size={18} className="text-gray-500" />
            <span className="text-sm">{meetingInfo.duration}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Video size={18} className="text-gray-500" />
            <span className="text-sm">{meetingInfo.type}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin size={18} className="text-gray-500" />
            <span className="text-sm">
              Time Zone: {timeZoneAbbr} (Times shown in your local time zone. Meetings scheduled in PST.)
            </span>
          </div>
        </div>
        {selectedDate && (
          <div className="mt-6 p-4 bg-neon/5 rounded-lg border border-neon">
            <p className="text-sm font-medium text-black">Selected Date</p>
            <p className="text-sm text-neon font-medium">
              {moment(selectedDate).tz(meetingInfo.timeZone).format('dddd, MMMM D, YYYY')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingInfo;