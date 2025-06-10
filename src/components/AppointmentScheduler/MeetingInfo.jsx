import React from 'react';
import { Clock, User, Video, MapPin } from 'lucide-react';
import moment from 'moment';
import { theme } from '../../theme';

const MeetingInfo = ({ meetingInfo, selectedDate }) => {
  return (
    <div className="col-span-12 lg:col-span-3">
      <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-neon rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{meetingInfo.host}</p>
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
            <span className="text-sm">Web conferencing details provided upon confirmation</span>
          </div>
        </div>

        {selectedDate && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-black">
              Selected Date
            </p>
            <p className="text-sm text-blue-700">
              {moment(selectedDate).format('dddd, MMMM D, YYYY')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingInfo;