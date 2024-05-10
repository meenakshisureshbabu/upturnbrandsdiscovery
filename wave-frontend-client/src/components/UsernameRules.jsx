import React from 'react'
import usernamerules from '../models/usernamecreationrules'
import '../components/general.css'

function UsernameRules() {
  return (
    <div className='usernamerules-div'>
        <div>
            <h3>Rules for username creation:</h3>
        </div>
        <div className='rules-list-div'>
            {
                usernamerules.map((rule) => {
                    return (
                        <div>
                            <p><b>{rule.rule_name}</b>:{rule.rule_description}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default UsernameRules