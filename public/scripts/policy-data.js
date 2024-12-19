const policyDetails = {
    accident: {
        title: "Accident Insurance",
        icon: "band-aid",
        description: "Our Accident Insurance provides comprehensive coverage for unexpected injuries, giving you peace of mind and financial protection when accidents occur.",
        coveragePoints: [
            "24/7 coverage for accidental injuries",
            "Emergency room and hospital stays",
            "Physical therapy and rehabilitation",
            "Ambulance services",
            "Fractures and dislocations"
        ],
        benefits: [
            {
                title: "Immediate Coverage",
                description: "No waiting period - coverage starts as soon as your policy is active"
            },
            {
                title: "Direct Payment",
                description: "Benefits paid directly to you, not the healthcare provider"
            },
            {
                title: "Family Coverage",
                description: "Optional coverage for spouse and dependents"
            }
        ]
    },
    critical: {
        title: "Critical Illness Insurance",
        icon: "heartbeat",
        description: "Financial protection against major illnesses, helping you focus on recovery without worrying about expenses.",
        coveragePoints: [
            "Heart attack and stroke",
            "Cancer diagnosis",
            "Organ failure",
            "Multiple sclerosis",
            "Advanced Alzheimer's disease"
        ],
        benefits: [
            {
                title: "Lump Sum Payment",
                description: "Receive a one-time payment upon diagnosis"
            },
            {
                title: "Wellness Benefit",
                description: "Annual benefit for health screenings"
            },
            {
                title: "Guaranteed Renewable",
                description: "Policy cannot be cancelled as long as premiums are paid"
            }
        ]
    },
    cancer: {
        title: "Cancer Insurance",
        icon: "ribbon",
        description: "Specialized coverage for cancer-related expenses, providing financial support throughout treatment and recovery.",
        coveragePoints: [
            "Cancer diagnosis and treatment",
            "Experimental treatments",
            "Hospital stays",
            "Radiation and chemotherapy",
            "Transportation and lodging"
        ],
        benefits: [
            {
                title: "Comprehensive Coverage",
                description: "Covers various types of cancer treatments"
            },
            {
                title: "Additional Benefits",
                description: "Coverage for second opinions and experimental treatments"
            },
            {
                title: "Family History",
                description: "Coverage available regardless of family history"
            }
        ]
    },
    disability: {
        title: "Disability Insurance",
        icon: "wheelchair",
        description: "Protect your income if you're unable to work due to a disability, ensuring financial stability for you and your family.",
        coveragePoints: [
            "Short-term and long-term disability",
            "Partial disability benefits",
            "Rehabilitation services",
            "Return to work programs",
            "Cost of living adjustments"
        ],
        benefits: [
            {
                title: "Income Replacement",
                description: "Up to 60% of your regular income"
            },
            {
                title: "Flexible Terms",
                description: "Choose your benefit period and waiting period"
            },
            {
                title: "Own Occupation",
                description: "Benefits if you can't perform your specific job"
            }
        ]
    },
    hospital: {
        title: "Hospital Insurance",
        icon: "hospital",
        description: "Additional coverage for hospital stays, helping you manage out-of-pocket expenses not covered by traditional health insurance.",
        coveragePoints: [
            "Hospital admission benefits",
            "Daily hospital confinement",
            "ICU coverage",
            "Surgery benefits",
            "Recovery care"
        ],
        benefits: [
            {
                title: "Daily Benefits",
                description: "Fixed cash benefit for each day in hospital"
            },
            {
                title: "No Network Restrictions",
                description: "Use any hospital of your choice"
            },
            {
                title: "Family Coverage",
                description: "Optional coverage for entire family"
            }
        ]
    }
};

export default policyDetails; 