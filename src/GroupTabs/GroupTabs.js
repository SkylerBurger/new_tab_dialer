import './groupTabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight, faUpload } from '@fortawesome/free-solid-svg-icons'
import Settings from '../Settings/Settings';

function GroupTabs({ groups, groupIndex, refreshConfig, setGroupIndex }) {
    function handleClick({ target }) {
        setGroupIndex(target.value);
    }

    return (
        <div id="GroupTabs">
            <ul>
                { groups.map( (group, idx) => {
                    const addClass = groupIndex === idx ? 'selectedGroup' : ''
                    return (
                        <li 
                            className={ addClass }
                            key={ idx } 
                            value={ idx } 
                            onClick={ handleClick }
                        >
                            { group.groupName }
                        </li>
                    );
                  })
                }
            </ul>
            <ul>
                <li><FontAwesomeIcon icon={ faUpload } /></li>
                <li onClick={ refreshConfig }><FontAwesomeIcon icon={ faArrowRotateRight } /></li>
                <li><Settings /></li>
            </ul>
        </div>
    )
};

export default GroupTabs;