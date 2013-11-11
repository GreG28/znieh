<?php

namespace Znieh\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class ZniehUserBundle extends Bundle
{
	 public function getParent()
    {
        return 'FOSUserBundle';
    }

}
