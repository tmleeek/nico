<?php
/**
 *
 * @category   Directshop
 * @package    Directshop_FraudDetection
 * @author     Ben James
 * @copyright  Copyright (c) 2008-2010 Directshop Pty Ltd. (http://directshop.com.au)
 */



$installer = $this;
$installer->startSetup();
$installer->run("ALTER TABLE frauddetection_data MODIFY `fraud_score` float(3,2)");
$installer->endSetup();