export const Select = ({value, onChange, options}) => {
    return <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => {
                    return <option key={option.id} value={option.value}>{option.label}</option>
                })
            }
            </select>
}

