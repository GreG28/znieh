<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Armor
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Armor
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
}

