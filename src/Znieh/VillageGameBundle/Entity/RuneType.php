<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RuneType
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class RuneType
{
    /**
     * @var string
     *
     * @ORM\Id
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    public function __construct($name) {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
}
