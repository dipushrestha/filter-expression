/**
 * Specifies complex condition and logical filter expressions used for filtering the results of the query.
 * @class
 */
class FilterExpression {
    /**
     * Initializes a new instance of the FilterExpression class.
     * @param {string} filterOperator The filter operator.
     */
    constructor(filterOperator = LogicalOperator.And) {
        this.filterOperator = filterOperator;
        this.expressionArray = [];
    }

    /**
     * Adds a condition to the filter expression setting the attribute name, condition operator, and value or value array.
     * @param {string} attribute Specifies the logical name of the attribute in the condition expression.
     * @param {string} operator Specifies the condition operator. This is set by using the ConditionOperator enumeration.
     * @param {string | Array} [value] Specifies the values of the attribute.
     * @returns {FilterExpression} 
    */
    addCondition(attribute, operator, value) {
        this.expressionArray.push(
            new ConditionExpression(attribute, operator, value).getCondition()
        );

        return this;
    }

    /**
     * Adds a child filter to the filter expression.
     * @param {FilterExpression} filterExpression The filter to be added.
     * @returns {FilterExpression}
     */
    addFilter(filterExpression) {
        this.expressionArray.push(filterExpression.retrieveFetchXml());

        return this;
    }

    /**
     * Retrieves fetch XML from FilterExpression object.
     * @returns {string} Fetch XML
     */
    retrieveFetchXml() {
        return `<filter type="${this.filterOperator}">${this.expressionArray.join('')}</filter>`;
    }
}

/**
 * Contains a condition expression used to filter the results of the query.
 * @class
 */
class ConditionExpression {
    /**
     * Constructor for FilterExpression.
     *
     * @param {string} attribute Specifies the logical name of the attribute in the condition expression.
     * @param {string} operator Specifies the condition operator. This is set by using the ConditionOperator enumeration.
     * @param {string | Array | null} [value] Specifies the values of the attribute.
     */
    constructor(attribute, operator, value) {
        this.attribute = attribute;
        this.operator = operator;
        this.value = value;
    }

    /**
     * Used to retrieve the condition expression that has been added.
     * @returns {string}
     */
    getCondition() {
        if (typeof this.value === 'undefined') {
            return `<condition attribute="${this.attribute}" operator="${this.operator}"/>`;
        }

        if (Array.isArray(this.value)) {
            return this.value.map(value => {
                return `<condition attribute="${this.attribute}" operator="${this.operator}" value="${value}" />`
            }).join('');
        }

        return `<condition attribute="${this.attribute}" operator="${this.operator}" value="${this.value}" />`;
    }
}

/** 
 * Contains the possible values for operator in FilterExpression. 
 * @readonly
 * @enum {string}
 */
const LogicalOperator = {
    Or: 'or',
    And: 'and'
};
Object.freeze(LogicalOperator);

/** 
 * Describes the type of comparison for two values (or expressions) in a condition expression. 
 * @readonly
 * @enum {string}
 */
const ConditionOperator = {
    Equal: 'eq',
    Null: 'null',
    NotEqual: 'ne',
    LessThan: 'lt',
    LessEqual: 'le',
    GreaterThan: 'gt',
    GreaterEqual: 'ge',
    NotNull: 'not-null'
};
Object.freeze(ConditionalOperator);
