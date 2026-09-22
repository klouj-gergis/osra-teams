import React from 'react'

export default function Team({ team, handleTeamToggle, formData }) {
  return (
    <label
            key={team.key}
            className="border p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleTeamToggle(team.name)}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={team.name}
                checked={formData.teams.includes(team.name)}
                onChange={() => {}}
              />
              <span className="">{team.emoji}</span>
              <span className="">{team.name}</span>
            </div>
            <div className="">{team.desc}</div>
          </label>
  )
}
