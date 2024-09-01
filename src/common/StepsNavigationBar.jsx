import { useSelector } from 'react-redux';

const StepsNavigationBar = ({ declarationType = 'NETDM', steps = [] }) => {

  const { stepsOfCreatePage, theme, colorMode } = useSelector(state => state)

  return (
    <>
      <ul className='wizard wizardbar'>
        {(Array.isArray(steps) || JSON.stringify(steps).startsWith("[")) && steps?.map((item, index) => {
          return (
            <li key={`wizard-${index}`}
              style={{ borderColor: index === stepsOfCreatePage?.ImD && colorMode }}
              className={index === stepsOfCreatePage[declarationType] ? `wizard--step wizard--active-step wizardbar-item current current-${theme}` : (stepsOfCreatePage?.disabledStepsList?.includes(index) && index < stepsOfCreatePage[declarationType]) ? 'wizard--step wizardbar-item current--check--disabled' : index < stepsOfCreatePage[declarationType] ? 'wizard--step wizardbar-item current--check' : 'wizard--step wizardbar-item '} >
              <p className='wizard--step__title'>
                {stepsOfCreatePage[declarationType] > (index) ?
                  (<span
                    className={stepsOfCreatePage?.disabledStepsList?.includes(index) ? 'wizard--step__level-check wizard--step__level-check--disabled' : 'wizard--step__level-check'}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </span>)
                  :
                  (<span
                    className='wizard--step__level-number'
                    style={{ borderColor: index === stepsOfCreatePage?.ImD && colorMode, color: index === stepsOfCreatePage?.ImD && colorMode }}
                  >{index + 1}
                  </span>)
                }
                {item.title}
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default StepsNavigationBar


