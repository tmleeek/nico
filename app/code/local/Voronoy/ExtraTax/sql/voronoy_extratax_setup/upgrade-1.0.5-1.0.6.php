<?php
/**
<<<<<<< HEAD
 * Magento Excise Tax Extension
=======
 * Magento Extra Tax Extension
>>>>>>> 5304ac8fefd1c4c0cdfe3bd924301daf6fa78620
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2015 by Yaroslav Voronoy (y.voronoy@gmail.com)
 * @license   http://www.gnu.org/licenses/
 */

/* @var Mage_Sales_Model_Resource_Setup $installer */
$installer = $this;
$tables = array(
    $installer->getTable('sales/quote_address'),
    $installer->getTable('sales/order'),
    $installer->getTable('sales/invoice'),
);

/*foreach ($tables as $table) {
    $installer->getConnection()->dropColumn($table, 'base_extra_tax_payment_amount');
    $installer->getConnection()->dropColumn($table, 'extra_tax_payment_amount');
}

*/