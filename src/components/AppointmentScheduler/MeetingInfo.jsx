import React from 'react';
import { Clock, Video } from 'lucide-react';
import moment from 'moment';
import 'moment-timezone';
import { RiTimeZoneLine } from 'react-icons/ri';
import Button from '../Button/Button';
import BodyText from '../BodyText/BodyText';
import Heading from '../Heading/Heading';

const MeetingInfo = ({ meetingInfo, selectedDate, onNext }) => {
  let timeZoneAbbr = '';
  let timeZoneFullName = '';

  // Only set time zone values if meetingInfo.timeZone is available and valid
  if (meetingInfo.timeZone && moment.tz.zone(meetingInfo.timeZone)) {
    timeZoneAbbr = moment.tz(meetingInfo.timeZone).zoneAbbr();
    timeZoneFullName = meetingInfo.timeZone; // Use API-provided name directly
  }

  return (
    <div className="col-span-12 lg:col-span-3 h-full">
      <div className="bg-white rounded-lg lg:shadow-sm lg:border p-6 h-full">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center">
              <img src="./favicon.svg" alt="Host Avatar" className="w-6 h-6" />
            </div>
          </div>
          <Heading text={meetingInfo.title} className="text-xl font-bold text-gray-900 mb-2" centered={false} />
          <BodyText text={meetingInfo.description} className="text-gray-600 text-sm mb-4" centered={false} />
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-gray-700">
            <Clock size={18} className="text-neon" />
            <BodyText text={meetingInfo.duration} className="text-sm" centered={false} />
          </div>
          <div className="flex items-start gap-3 text-gray-700">
            <Video size={18} className="text-neon" />
            <BodyText text={meetingInfo.type} className="text-sm" centered={false} />
          </div>
       <div className="flex items-start gap-3 text-gray-700 min-h-[24px]">
  <RiTimeZoneLine size={18} className="text-neon mt-[2px]" />
  <div className="flex flex-col">
    {meetingInfo.timeZone && moment.tz.zone(meetingInfo.timeZone) ? (
      <BodyText
        text={`${timeZoneAbbr} (${timeZoneFullName})`}
        className="text-sm transition-opacity duration-300 opacity-100"
        centered={false}
      />
    ) : (
      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
    )}
  </div>
</div>

        </div>

        {/* Selected Date (lg and above) */}
        {selectedDate && (
          <div className="hidden lg:block mt-6 p-4 bg-neon/5 rounded-lg border border-neon">
            <BodyText text="Selected Date" className="text-sm font-medium text-black" centered={false} />
            <BodyText
              text={moment(selectedDate)
                .tz(meetingInfo.timeZone || 'Asia/Karachi')
                .format('dddd, MMMM D, YYYY')}
              className="text-sm text-neon font-semibold"
              centered={false}
            />
          </div>
        )}

        {/* Schedule Meeting Button (below lg) */}
        <div className="block lg:hidden mt-4">
          <Button
            name="Schedule Meeting"
            fontSize="text-xs"
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingInfo;