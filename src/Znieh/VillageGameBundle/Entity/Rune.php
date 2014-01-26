<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity
 */
class Rune extends GameObject
{
    /**
     * @ORM\ManyToOne(targetEntity="RuneType", cascade={"persist"})
     * @ORM\JoinColumn(name="type_name", referencedColumnName="name")
     */
    private $type;

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\RuneType $type
     *
     * @return Rune
     */
    public function setType(\Znieh\VillageGameBundle\Entity\RuneType $type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\RuneType
     */
    public function getType()
    {
        return $this->type;
    }
}
