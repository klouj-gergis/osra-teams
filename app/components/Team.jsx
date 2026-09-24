import React from 'react'
import './FormComponent.module.css'

export default function Team({ team, handleTeamToggle, formData }) {
  return (
    <label
            key={team.key}
            className=" card"
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
