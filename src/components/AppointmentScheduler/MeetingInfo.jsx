import React from 'react';
import { Clock, Video, MapPin } from 'lucide-react';
import moment from 'moment';
import 'moment-timezone';
import { RiTimeZoneLine } from 'react-icons/ri';
import Button from '../Button/Button';

const MeetingInfo = ({ meetingInfo, selectedDate, onNext }) => {
  let timeZoneAbbr = 'PKT';
  let timeZoneFullName = 'Pakistan Standard Time';

  if (meetingInfo.timeZone && moment.tz.zone(meetingInfo.timeZone)) {
    timeZoneAbbr = moment.tz(meetingInfo.timeZone).zoneAbbr();
    timeZoneFullName = moment.tz.zone(meetingInfo.timeZone).name;
  }

  const timeZoneDisplay = `${timeZoneAbbr} (${timeZoneFullName})`;

  return (
    <div className="col-span-12 lg:col-span-3 h-full">
      <div className="bg-white rounded-lg lg:shadow-sm lg:border p-6 h-full">
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
            <Clock size={18} className="text-neon" />
            <span className="text-sm">{meetingInfo.duration}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Video size={18} className="text-neon" />
            <span className="text-sm">{meetingInfo.type}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <RiTimeZoneLine size={18} className="text-neon" />
            <span className="text-sm">Time Zone: {timeZoneDisplay}</span>
          </div>
        </div>

        {/* Selected Date (lg and above) */}
        {selectedDate && (
          <div className="hidden lg:block mt-6 p-4 bg-neon/5 rounded-lg border border-neon">
            <p className="text-sm font-medium text-black">Selected Date</p>
            <p className="text-sm text-neon font-medium">
              {moment(selectedDate)
                .tz(meetingInfo.timeZone || 'Asia/Karachi')
                .format('dddd, MMMM D, YYYY')}
            </p>
          </div>
        )}

        {/* Schedule Meeting Button (below lg) */}
        <div className="block lg:hidden mt-4">
          <Button
            name="Schedule Meeting"
            fontSize="text-xs"
            onClick={onNext} // Trigger step change
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingInfo;